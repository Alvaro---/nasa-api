import MarsRover from '@/components/MarsRover'
import styles from './page.module.css'
import FilterBar from '@/components/FilterBar'

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Photos NASA</h1>
      <FilterBar />
      <MarsRover />

    </main>
  )
}
