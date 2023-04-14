import { dropdownType } from "../../../types/register";
import jsonStates from "../data/states.json";
import jsonDistricts from "../data/districts.json";

const states: dropdownType[] = jsonStates.map(({ name, code }: any) => ({
  label: name,
  id: code,
}));
states.sort((a: dropdownType, b: dropdownType) => a.id - b.id);

const constitutionOfFirm: dropdownType[] = [
  { label: "Proprietory", id: 1 },
  { label: "Partnership", id: 2 },
  { label: "Private Limited", id: 3 },
  { label: "Public Limited", id: 4 },
  { label: "HUF", id: 5 },
  { label: "Cooperative Society", id: 6 },
  { label: "Other", id: 7 },
];

const getDistrictsOfState = (stateCode: number) => {
  if(stateCode === -1)return []
  return <dropdownType[]>(
    jsonDistricts
      .filter((district: any) => district.code === stateCode)[0]
      .districts.map(({ id, name }: any) => ({ label: name, id }))
  );
};

const accountTypes: dropdownType[] = [
  { label: "Current Account", id: 1 },
  { label: "Savings Account", id: 2 },
  { label: "Salary Account", id: 3 },
  { label: "Fixed Account", id: 4 },
  { label: "OD Account", id: 5 },
];

export { states, constitutionOfFirm, getDistrictsOfState, accountTypes };
