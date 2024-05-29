const HOST = 'https://test.v5.pryaniky.com';

interface DocumentRecord {
  id: string;
  documentName: string;
  documentType: string;
  documentStatus: string;
  companySignatureName: string;
  companySigDate: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  employeeNumber: string;
}

function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

function login(username: string, password: string): Promise<any> {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`
    })
  })
    .then((res) => {
      return checkResponse(res);
    })
};

function getData(token: string): Promise<any> {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
    method: 'GET',
    headers: {
      'x-auth': `${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return checkResponse(res)
    })
}

function createRecord(token: string, record: DocumentRecord): Promise<any> {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
    method: 'POST',
    headers: {
      'x-auth': `${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "companySigDate": `${record.companySigDate}`,
      "companySignatureName": `${record.companySignatureName}`,
      "documentName": `${record.documentName}`,
      "documentStatus": `${record.documentStatus}`,
      "documentType": `${record.documentType}`,
      "employeeNumber": `${record.employeeNumber}`,
      "employeeSigDate": `${record.employeeSigDate}`,
      "employeeSignatureName": `${record.employeeSignatureName}`
    })
  })
    .then((res) => {
      return checkResponse(res)
    })
}

function deleteRecord(token: string, id: string | number): Promise<any> {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
    method: 'POST',
    headers: {
      'x-auth': `${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return checkResponse(res)
    })
}

function editRecord(token: string, id: string | number, record: DocumentRecord): Promise<any> {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
    method: 'POST',
    headers: {
      'x-auth': `${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "companySigDate": `${record.companySigDate}`,
      "companySignatureName": `${record.companySignatureName}`,
      "documentName": `${record.documentName}`,
      "documentStatus": `${record.documentStatus}`,
      "documentType": `${record.documentType}`,
      "employeeNumber": `${record.employeeNumber}`,
      "employeeSigDate": `${record.employeeSigDate}`,
      "employeeSignatureName": `${record.employeeSignatureName}`
    })
  })
    .then((res) => {
      return checkResponse(res)
    })
}

export {login, getData, createRecord, deleteRecord, editRecord};