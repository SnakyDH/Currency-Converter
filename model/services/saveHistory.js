export const history = [];

export const saveHistory = async (data) => {
  history.unshift(data);
};
