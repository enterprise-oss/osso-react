import download from 'downloadjs';
import React, { ReactElement } from 'react';

import { useIdentityProvider } from '~hooks';
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

  const downloadDocumentation = async () => {
    if (!data) return;
    const template = await fetch(`/pdfv${PDF_VERSION}/azure.pdf`).then((res) => res.arrayBuffer());
    const pdf = await generateDocumentation(template, data.identityProvider);
    download(pdf, 'Azure ADFS setup.pdf', 'application/pdf');
  };

  return data ? <ButtonComponent onClick={downloadDocumentation}>Download Documentation</ButtonComponent> : null;
}
