import UserService from '../services/user'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    UserService.getAllUsers()
      .then(result => {
        router.push('/users')
      })
      .catch(error => {
        if (error.message === 'Network Error') {
          setNetworkError(true)
        }
      })
  })

  return (
    <Box css={{ height: "100vh" }}>
      <Box
        display="flex"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center">
        <Typography variant="h6" noWrap>
          {networkError ? 'Application is not connected to the server.' : 'Connecting...'}
        </Typography>
      </Box>
    </Box>
  )
}

export default Home
