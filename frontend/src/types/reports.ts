export type Report = {
  id: string;
  firstName: string;
  lastName: string;
  event: string;
  type: string;
  description: string;
  country: string;
  gender: "male" | "female";
  age: number;
  date: string;
};
