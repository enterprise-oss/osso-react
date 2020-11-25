import download from 'downloadjs';
import { useState } from 'react';

import generateDocumentation, { PDF_VERSION } from '~utils/documentationWriter';

import useAppConfig from '../useAppConfig';
import useIdentityProvider from '../useIdentityProvider';
import useOssoFields from '../useOssoFields';

const useOssoDocs = (
  id: string,
): {
  downloadDocs: () => void;
  loading: boolean;
} => {
  const { data } = useIdentityProvider(id);
  const { fieldsForProvider } = useOssoFields();
  const { data: appData } = useAppConfig();
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

    const providerDetails = fieldsForProvider(service);
    const url = `https://assets.ossoapp.io/pdf/${PDF_VERSION}/${service.toLowerCase()}.pdf`;

    const template = await fetch(url).then((res) => res.arrayBuffer());

    const pdf = await generateDocumentation(template, data.identityProvider, appData.appConfig);

    download(pdf, `${providerDetails.label} SAML setup - ${domain}.pdf`, 'application/pdf');
    setLoading(false);
  };
  return {
    downloadDocs,
    loading,
  };
};

export default useOssoDocs;
