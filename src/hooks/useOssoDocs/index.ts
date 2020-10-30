import { HttpLink } from '@apollo/client';
import download from 'downloadjs';
import { useContext, useState } from 'react';

import OssoContext from '~client';
import generateDocumentation, { PDF_VERSION } from '~utils/documentationWriter';

import useAppConfig from '../useAppConfig';
import useIdentityProvider from '../useIdentityProvider';

const useOssoDocs = (
  id: string,
): {
  downloadDocs: () => void;
  loading: boolean;
} => {
  const { data } = useIdentityProvider(id);
  const { data: appData } = useAppConfig();
  const { baseUrl, client } = useContext(OssoContext);
  const [loading, setLoading] = useState(false);

  const downloadDocs = async () => {
    if (!(data && appData)) {
      console.error('data', data, 'appConfig', appData);
      return;
    }
    setLoading(true);
    const {
      identityProvider: { service, domain },
    } = data;
    let url = `/pdfv${PDF_VERSION}/${service.toLowerCase()}.pdf`;

    if (baseUrl) {
      url = baseUrl + url;
    }

    const template = await fetch(url, {
      mode: 'cors',
      headers: (client?.link as HttpLink)?.options?.headers,
    }).then((res) => res.arrayBuffer());
    const pdf = await generateDocumentation(template, data.identityProvider, appData.appConfig);
    download(pdf, `${service} SAML setup - ${domain}.pdf`, 'application/pdf');
    setLoading(false);
  };
  return {
    downloadDocs,
    loading,
  };
};

export default useOssoDocs;
