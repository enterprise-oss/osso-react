import CSS from 'csstype';
import React, { ReactElement } from 'react';
import { IdentityProvider, OssoInputProps } from './index.types';
declare function OssoGeneratedFieldsComponent({ identityProvider, InputComponent, containerStyle, }: {
    identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
    InputComponent: React.FC<OssoInputProps>;
    containerStyle?: CSS.Properties;
}): ReactElement | null;
declare namespace OssoGeneratedFieldsComponent {
    var defaultProps: {
        InputComponent: ({ label, ...inputProps }: OssoInputProps) => JSX.Element;
        containerStyle: undefined;
    };
}
export default OssoGeneratedFieldsComponent;
