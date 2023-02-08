import { isAxiosError, AxiosError } from "axios";
import { toast } from "react-hot-toast";

export function getError(error: AxiosError | unknown) {
  if (isAxiosError(error)) return error.response!.data.message;
  return String(error);
}

export const throwError = ({ message }: { message: string }) => {
    return toast.error(message);
};
