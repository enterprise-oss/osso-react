import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';

import OssoContext from '~client';
import { createIdentityProvider, useEnterpriseAccount } from '~hooks';
import { Providers } from '~types';

import ConfigDetails from './configDetails';
import ProviderPicker from './providerPicker';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function OssoConfig({ domain }: { domain: string }): ReactElement {
  Modal.setAppElement('#root');
  const [modalOpen, setModalOpen] = useState(false);
  const { data: accountData, loading: accountLoading } = useEnterpriseAccount(domain);
  const [step, setStep] = useState(0);
  const [provider, setProvider] = useState<Providers>();
  const { createProvider, data, loading: identityProviderLoading } = createIdentityProvider();
  console.log(data);
  const valid: Record<number, boolean> = {
    0: Boolean(provider !== undefined && accountData?.enterpriseAccount?.id),
  };

  const onNext = () => {
    if (!valid[step]) return;

    if (step === 0) {
      createProvider({
        enterpriseAccountId: accountData?.enterpriseAccount?.id,
        service: provider!,
      }).then(() => setStep(1));
    }
  };

  return (
    <>
      <button id="modal-btn" onClick={() => setModalOpen(true)}>
        Configure Saml
      </button>
      <Modal isOpen={modalOpen} style={modalStyles} contentLabel="Example Modal">
        <ProviderPicker step={step} provider={provider} onChange={setProvider} />
        {data && <ConfigDetails step={step} identityProvider={data.createIdentityProvider.identityProvider} />}
        <div>
          <button onClick={onNext}>Next</button>
        </div>
      </Modal>
    </>
  );
}

export default function OssoConfigHOC() {
  const { currentUser } = useContext(OssoContext);
  const [domain, setDomain] = useState<string>();
  useEffect(() => {
    if (!currentUser) return;
    setDomain(currentUser.email.split('@')[1]);
  }, [currentUser?.email]);

  return domain ? <OssoConfig domain={domain} /> : null;
}
