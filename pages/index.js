import MainLayout from '../layouts/MainLayout'
import styles from '../styles/Home.module.css'
import Typography from '@material-ui/core/Typography'

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <Typography variant="h6" gutterBottom>
          Please, choose if you want to manage tasks or users.
        </Typography>
      </div>
    </MainLayout>
  )
}
