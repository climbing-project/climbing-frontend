import { Dispatch, SetStateAction } from "react";

export interface InputProps {
  name: string;
  title: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: { target: { value: string } }) => Promise<void> | void;
  message?: string;
  buttonText?: string;
  onClick?: any;
  onDisabled?: any;
}

export interface EmailVerificationProps {
  remainingTime: number;
  setTime: Dispatch<SetStateAction<number>>;
  isBtnDisabled: boolean;
  setBtnDisabled: Dispatch<SetStateAction<boolean>>;
  verificationNum: string;
  isCodeValid: boolean;
  setIsCodeValid: Dispatch<SetStateAction<boolean>>;
}
