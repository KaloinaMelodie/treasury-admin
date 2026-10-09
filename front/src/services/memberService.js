import api from "./api";

export async function getMembers(params = {}) {
  const response = await api.get(
    "/members",

    {
      params,
    },
  );

  return response.data;
}

export async function getMember(id) {
  const response = await api.get(`/members/${id}`);

  return response.data;
}

export async function createMember(data) {
  const response = await api.post(
    "/members",

    data,
  );

  return response.data;
}

export async function updateMember(id, data) {
  const response = await api.put(
    `/members/${id}`,

    data,
  );

  return response.data;
}

export async function updateMemberStatus(id, status) {
  const response = await api.patch(
    `/members/${id}/status`,

    {
      status,
    },
  );

  return response.data;
}
