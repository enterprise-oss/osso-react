import { HttpLink } from '@apollo/client';
import download from 'downloadjs';
import React, { ReactElement, useContext } from 'react';

import OssoContext from '~client';
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
  const { baseUrl, client } = useContext(OssoContext);

  const downloadDocumentation = async () => {
    if (!(data && appData)) return;
    const {
      identityProvider: { service, domain },
    } = data;
    const template = await fetch(baseUrl + `/pdfv${PDF_VERSION}/${service.toLowerCase()}.pdf`, {
      mode: 'cors',
      headers: (client?.link as HttpLink)?.options?.headers,
    }).then((res) => res.arrayBuffer());
    const pdf = await generateDocumentation(template, data.identityProvider, appData.appConfig);
    download(pdf, `${service} SAML setup - ${domain}.pdf`, 'application/pdf');
  };

  return data ? <ButtonComponent onClick={downloadDocumentation}>Download Documentation</ButtonComponent> : null;
}
