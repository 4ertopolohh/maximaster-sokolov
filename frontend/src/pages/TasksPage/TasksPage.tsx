import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../TasksPage/TasksPage.scss'
import PlacingAnOrder from './components/PlacingAnOrder/PlacingAnOrder';
import RandomColor from './components/RandomColor/RandomColor';
import TableProducts from './components/TableProducts/TableProducts';

const TasksPage = () => {
  return (
    <main className="page">
        <Story />
        <RandomColor />
        <PlacingAnOrder />
        <TableProducts />
        <InDevSection sectionName='Tasks'/>
    </main>
  )
}

export default TasksPage;