export async function getMemberOptions() {
  const response = await api.get("/members/options");
  return response.data.data;
}