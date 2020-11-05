import MainLayout from '../layouts/MainLayout'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PersonIcon from '@material-ui/icons/Person'
import UserService from '../services/user'
import FormUser from '../components/FormUser'
import React from 'react'
import { useRouter } from 'next/router'

const Users = props => {
  const router = useRouter()

  const [formUser, setFormUser] = React.useState(false)
  const [usersList, setUsersList] = React.useState(props.users)

  const test = (event, user) => {
    router.push({
      pathname: '/user/[id]',
      query: { id: user.id }
    })
  }

  const handleFormUser = () => {
    setFormUser(true)
  }

  const updateData = (data) => {
    UserService.getAllUsers()
      .then(result => {
        setUsersList(result.sort((a,b) => b.updatedAt - a.updatedAt))
      })
  }

  return (
    <MainLayout>
      <Typography variant="h6" gutterBottom>
        Users
        <IconButton edge="end" aria-label="more" aria-controls="fade-menu" aria-haspopup="true" onClick={handleFormUser}>
          <AddCircleIcon />
        </IconButton>

        {formUser && <FormUser passFormUser={setFormUser} update={updateData} />}
      </Typography>
      <List>
        {usersList.map((user, index) => (
          <ListItem button onClick={(event) => test(event, user)} key={index}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </MainLayout>
  )
}

export async function loadData() {
  const users = await UserService.getAllUsers()
  return users
}

export async function getServerSideProps(context) {
  const users = await UserService.getAllUsers()
  return {
    props: {
      users: users.sort((a,b) => b.updatedAt - a.updatedAt)
    }
  }
}

export default Users
