import React, { ReactElement } from 'react';

import { useOssoDocs } from '~hooks';

import { IdentityProvider, OssoButtonComponentProps } from './index.types';

export default function DownloadDocs({
  identityProvider,
  ButtonComponent,
}: {
  identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
  ButtonComponent: React.FC<OssoButtonComponentProps>;
}): ReactElement | null {
  const { downloadDocs } = useOssoDocs(identityProvider.id);

  return <ButtonComponent onClick={downloadDocs}>Download Documentation</ButtonComponent>;
}
