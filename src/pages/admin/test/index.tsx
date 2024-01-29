import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewGymForm from '@/admincomponents/NewGymForm';

interface NewData {
  [key: string]: FormDataEntryValue;
}

interface GymFormData {
  id?: string;
  name: string;
  address: {
    addr1: string;
    addr2: string;
    addr3: string;
    addr4: string;
  };
  coordinates?: {
    latitude: string;
    longitude: string;
  };
}

const AdminPage = () => {
  const [dbData, setDbData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    attachListener();
    const mapApi =
      'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=lm660e08li&submodules=geocoder';
    const script = document.querySelector(
      `script[src='${mapApi}']`,
    ) as HTMLScriptElement;

    if (script) {
      handleLoader();
      return;
    }

    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = mapApi;
    document.head.appendChild(newScript);
    newScript.onload = handleLoader;
  }, []);

  const handleLoader = () => {
    setIsLoading(false);
  };

  // CRUD: Create
  const createData = async (input: GymFormData) => {
    const data = await fetch('http://localhost:3000/gyms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });
    const result = await data.json();

    paintDom(result);
  };

  // CRUD: Retrieve
  const getData = async () => {
    const data = await (await fetch('http://localhost:3000/gyms')).json();

    setDbData(data);
    const delContainer = document.getElementById(
      'delete-container',
    ) as HTMLDivElement;
    const updContainer = document.getElementById(
      'update-container',
    ) as HTMLDivElement;
    delContainer.innerHTML = '';
    updContainer.innerHTML = '';
    data.forEach((dat: GymFormData) => paintDom(dat));
  };

  // CRUD: Update
  const updateData = async (newData: GymFormData) => {
    const data = await fetch(`http://localhost:3000/gyms/${newData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    updateDom(newData);
  };

  // CRUD: Delete
  const deleteData = async (id: string) => {
    const data = await fetch(`http://localhost:3000/gyms/${id}`, {
      method: 'DELETE',
    });

    const deleteElem = document.getElementById(`${id}-delete`) as HTMLElement;
    const updateElem = document.getElementById(`${id}-update`) as HTMLElement;
    deleteElem.remove();
    updateElem.remove();
    getData();
  };

  const paintDom = (gymData: GymFormData) => {
    const deleteDiv = document.createElement('div');
    deleteDiv.id = `${gymData.id as string}-delete`;
    deleteDiv.setAttribute('style', 'display:flex; flex-direction:column');

    const updateDiv = document.createElement('div');
    updateDiv.id = `${gymData.id as string}-update`;
    updateDiv.setAttribute('style', 'display:flex; flex-direction:column');

    const fullAddress = `${gymData.address.addr1} ${gymData.address.addr2} ${gymData.address.addr3} ${gymData.address.addr4}`;

    deleteDiv.innerHTML = `
    <div><strong>암장명:</strong>&nbsp;${gymData.name}</div>
    <div><strong>암장 주소:</strong>&nbsp;${fullAddress}</div>
    <button id='${gymData.id}-detlbtn'>삭제</button>
    `;

    updateDiv.innerHTML = `
    <div><strong>암장명:</strong>&nbsp;${gymData.name}</div>
    <div><strong>암장 주소:</strong>&nbsp;${fullAddress}</div>
    <button id='${gymData.id}-updbtn'>수정</button>
    `;

    const updateContainer = document.getElementById(
      'update-container',
    ) as HTMLElement;
    const deleteContainer = document.getElementById(
      'delete-container',
    ) as HTMLElement;
    updateContainer.append(updateDiv);
    deleteContainer.append(deleteDiv);

    const updateBtn = document.getElementById(
      `${gymData.id}-updbtn`,
    ) as HTMLButtonElement;
    const deleteBtn = document.getElementById(
      `${gymData.id}-detlbtn`,
    ) as HTMLButtonElement;

    deleteBtn.addEventListener('click', () => deleteData(gymData.id as string));
    updateBtn.addEventListener('click', () => getEditFields(gymData));
  };

  const getEditFields = (gymData: GymFormData) => {
    const { addr1, addr2, addr3, addr4 } = gymData.address;
    const parent = document.getElementById(
      `${gymData.id}-update`,
    ) as HTMLDivElement;
    parent.innerHTML = `
      <div><strong>암장명:</strong>&nbsp;<input id='edit-name' value='${gymData.name}'/></div>
      <div><strong>암장 주소:</strong>&nbsp;<input id='edit-address' value='${addr1} ${addr2} ${addr3}' disabled/><input id='edit-building' value='${addr4}' disabled/></div>
      <button id='${gymData.id}-applybtn'>적용</button>
    `;

    const btn = document.getElementById(
      `${gymData.id}-applybtn`,
    ) as HTMLButtonElement;
    btn.onclick = () => {
      const newData = getChangedFields(gymData.id as string);
      updateData(newData);
    };
  };

  const getChangedFields = (id: string): GymFormData => {
    const fullAddress = (
      document.getElementById('edit-address') as HTMLInputElement
    ).value;
    const addr4 = (document.getElementById('edit-building') as HTMLInputElement)
      .value;
    const [addr1, addr2, ...addr3] = fullAddress.split(' ');
    const data: GymFormData = {
      id,
      name: (document.getElementById('edit-name') as HTMLInputElement).value,
      address: {
        addr1,
        addr2,
        addr3: addr3.join(' '),
        addr4,
      },
    };
    return data;
  };

  const updateDom = (newData: GymFormData) => {
    const deleteElem = document.getElementById(
      `${newData.id}-delete`,
    ) as HTMLElement;
    const updateElem = document.getElementById(
      `${newData.id}-update`,
    ) as HTMLElement;

    deleteElem.innerHTML = `
    <div><strong>암장명:</strong>&nbsp;${newData.name}</div>
    <button id='${newData.id}-detlbtn'>삭제</button>
    `;

    updateElem.innerHTML = `
    <div><strong>암장명:</strong>&nbsp;${newData.name}</div>
    <button id='${newData.id}-updbtn'>수정</button>
    `;

    const updateBtn = document.getElementById(
      `${newData.id}-updbtn`,
    ) as HTMLButtonElement;
    const deleteBtn = document.getElementById(
      `${newData.id}-detlbtn`,
    ) as HTMLButtonElement;
    deleteBtn.addEventListener('click', () => deleteData(newData.id as string));
    updateBtn.addEventListener('click', () => getEditFields(newData));
  };

  const attachListener = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const formData = Object.fromEntries(
        new FormData(form as HTMLFormElement),
      );
      const validData = getValidEntries(formData);

      return createData(validData);
    });
  };

  const getValidEntries = (formData: NewData): GymFormData => {
    const [addr1, addr2, ...addr3] = (
      formData['street-address'] as string
    ).split(' ');
    const validData: GymFormData = {
      name: formData.name as string,
      address: {
        addr1,
        addr2,
        addr3: addr3.join(' '),
        addr4: formData['building-address'] as string,
      },
      coordinates: {
        latitude: formData.latitude as string,
        longitude: formData.longitude as string,
      },
    };

    return validData;
  };

  return (
    <>
      <Title>Create</Title>
      <Wrapper>
        <NewGymForm />
      </Wrapper>
      <Title>Retrieve</Title>
      <Wrapper>
        <button onClick={() => getData()}>데이터 가져오기</button>
        <div id="retrieve">{JSON.stringify(dbData)}</div>
      </Wrapper>
      <Title>Update</Title>
      <Wrapper id="update-container"></Wrapper>
      <Title>Delete</Title>
      <Wrapper id="delete-container"></Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 24px;
  margin-bottom: 32px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 14pt;
`;

export default AdminPage;
