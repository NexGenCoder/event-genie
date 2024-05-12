import { useGetSelfQuery } from '@/app/services/authApi'

export const useIsAuthenticated = () => {
   const { data, isLoading, isError } = useGetSelfQuery()
   const isLoggedin = !isLoading && !isError
   return { isLoggedin, data: data?.data, isLoading, isError }
}
