import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../TasksPage/TasksPage.scss'

const TasksPage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='Tasks'/>
    </main>
  )
}

export default TasksPage;