import { HttpLink } from '@apollo/client';
import download from 'downloadjs';
import { useContext } from 'react';

import OssoContext from '~client';
import generateDocumentation, { PDF_VERSION } from '~utils/documentationWriter';

import useAppConfig from '../useAppConfig';
import useIdentityProvider from '../useIdentityProvider';

const useOssoDocs = (
  id: string,
): {
  downloadDocs: () => void;
} => {
  const { data } = useIdentityProvider(id);
  const { data: appData } = useAppConfig();
  const { baseUrl, client } = useContext(OssoContext);

  const downloadDocs = async () => {
    if (!(data && appData)) return;
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
  };
  return {
    downloadDocs,
  };
};

export default useOssoDocs;
