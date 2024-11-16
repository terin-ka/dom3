import api from "./api";

const getUser = async (userId) => {
  try {
    let response = await api.get("api/user/user/" + userId);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

/*detail profilu uživatele*/
const getUserProfile = async (userId) => {
  try {
    const response = await api.get("api/user/profile/" + userId);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? error.message);
  }
};

const changeEmail = (userId, email) => {
  return api.post("api/user/changeemail", {
    id: userId,
    email,
  });
};

const UserService = {
  getUserProfile,
  getUser,
  changeEmail,
};

export default UserService;
