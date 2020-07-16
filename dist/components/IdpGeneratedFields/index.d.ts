import CSS from 'csstype';
import React, { ReactElement } from 'react';
import { IdentityProvider, OssoInputProps } from './index.types';
declare function IdpGeneratedFieldsComponent({ identityProvider, InputComponent, UploadComponent, ButtonComponent, containerStyle, }: {
    identityProvider: Pick<IdentityProvider, 'id'> & Partial<IdentityProvider>;
    InputComponent: React.FC<OssoInputProps>;
    UploadComponent: React.FC<OssoInputProps>;
    ButtonComponent: React.FC<ButtonComponentProps>;
    containerStyle?: CSS.Properties;
}): ReactElement | null;
declare namespace IdpGeneratedFieldsComponent {
    var defaultProps: {
        ButtonComponent: ({ children, onClick }: ButtonComponentProps) => JSX.Element;
        InputComponent: ({ label, onChange, ...inputProps }: OssoInputProps) => JSX.Element;
        UploadComponent: ({ label, onChange, ...inputProps }: OssoInputProps) => JSX.Element;
        containerStyle: undefined;
    };
}
export default IdpGeneratedFieldsComponent;
declare type ButtonComponentProps = {
    children: ReactElement | string;
    onClick: () => void;
};
