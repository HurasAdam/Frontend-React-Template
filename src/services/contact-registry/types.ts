import type { ContactType } from "../../pages/app/register-activity/view/RegisterActivityPage";

export interface ContactPayload {
  topicId: string;
  type: ContactType;
  note?: string;
}
