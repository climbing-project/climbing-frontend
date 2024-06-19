import * as xlsx from "xlsx";

const readExcelFile = async (filePath: string) => {
  try {
    const path = "../../../public";
    const file = xlsx.readFile(`../../../public/districtData.xlsx`);
    console.log("read file");
    let data: unknown[] = [];

    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDistrictList = () => {
  console.log("distrct");
  return readExcelFile("한국행정구역분류.xlsx");
};
