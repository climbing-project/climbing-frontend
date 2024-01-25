import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewGymForm from '@/admincomponents/NewGymForm';

interface NewData {
  [key: string]: FormDataEntryValue;
}

interface GymFormData {
  id?: string;
  name: string;
}

const AdminPage = () => {
  const [dbData, setDbData] = useState([]);

  useEffect(() => attachListener(), []);

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
    const result = await data.json();

    const deleteElem = document.getElementById(
      `${newData.id}-delete`,
    ) as HTMLElement;
    const updateElem = document.getElementById(
      `${newData.id}-update`,
    ) as HTMLElement;
    deleteElem.remove();
    updateElem.remove();
    paintDom(result);
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
    const updateDiv = document.createElement('div');

    deleteDiv.innerHTML = `<div id='${gymData.id as string}-delete' style='display:flex; flex-direction:column;'>
    <div>
    <div><strong>암장명:</strong>&nbsp;${gymData.name}</div>
    </div>
    <button id='${gymData.id}-detlbtn'>삭제</button>
    </div>`;

    updateDiv.innerHTML = `<div id='${gymData.id as string}-update' style='display:flex; flex-direction:column;'>
    <div>
    <div><strong>암장명:</strong>&nbsp;${gymData.name}</div>
    </div>
    <button id='${gymData.id}-updbtn'>수정</button>
    </div>`;

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
    const parent = document.getElementById(
      `${gymData.id}-update`,
    ) as HTMLDivElement;
    parent.innerHTML = `
    <div>
    <div><strong>암장명:</strong>&nbsp;<input id='edit-name' value='${gymData.name}'/></div>
    </div>
    <button id='${gymData.id}-applybtn'>적용</button>
    </div>
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
    const data: GymFormData = {
      id,
      name: (document.getElementById('edit-name') as HTMLInputElement).value,
    };
    return data;
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
    const validData: GymFormData = {
      name: formData.name as string,
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
