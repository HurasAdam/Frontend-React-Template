import { useMutation } from "@tanstack/react-query";
import { contactRegistryService } from "../../../services/contact-registry/contact-registry.service";
import type { ContactPayload } from "../../../services/contact-registry/types";

export const useAddContactRecordMutation = () => {
  return useMutation({
    mutationFn: (payload: ContactPayload) => {
      return contactRegistryService.add(payload);
    },
  });
};
