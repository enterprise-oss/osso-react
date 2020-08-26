import download from 'downloadjs';
import React, { ReactElement } from 'react';

import { useAppConfig, useIdentityProvider } from '~hooks';
import generateDocumentation, { PDF_VERSION } from '~utils/documentationWriter';

import { IdentityProvider, OssoButtonComponentProps } from './index.types';

export default function DownloadDocs({
  identityProvider,
  ButtonComponent,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  ButtonComponent: React.FC<OssoButtonComponentProps>;
}): ReactElement | null {
  const { data } = useIdentityProvider(identityProvider.id);
  const { data: appData } = useAppConfig();
  const downloadDocumentation = async () => {
    if (!(data && appData)) return;
    const {
      identityProvider: { service, domain },
    } = data;
    const template = await fetch(`/pdfv${PDF_VERSION}/${service.toLowerCase()}.pdf`).then((res) => res.arrayBuffer());
    const pdf = await generateDocumentation(template, data.identityProvider, appData.appConfig);
    download(pdf, `${service} SAML setup - ${domain}.pdf`, 'application/pdf');
  };

  return data ? <ButtonComponent onClick={downloadDocumentation}>Download Documentation</ButtonComponent> : null;
}
