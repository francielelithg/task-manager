import MainLayout from '../layouts/MainLayout'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PersonIcon from '@material-ui/icons/Person'
import UserService from '../services/user'
import React from 'react'

const Users = props => {
  const test = (event, user) => {
    
  }

  return (
    <MainLayout>
        <Typography variant="h6" gutterBottom>
          Users
        </Typography>
        <div>
            <List>
              {props.users.map(user => (
                <ListItem button onClick={(event) => test(event, user)}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="more">
                    <MoreHorizIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              ))}
            </List>
          </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const users = await UserService.getAllUsers()
  return {
    props: {
      users: users
    }
  }
}

export default Users
