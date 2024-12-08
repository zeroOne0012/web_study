import { useQueryClient } from 'react-query';

const queryClient = useQueryClient();

function updateUser(newUser) {
  queryClient.setQueryData(queryKeys.user, newUser); 
}

function clearUser() {
  queryClient.setQueryData(queryKeys.user, null); // onSuccess 트리거
}

export { updateUser, clearUser };