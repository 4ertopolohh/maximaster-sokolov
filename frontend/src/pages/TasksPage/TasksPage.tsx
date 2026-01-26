// import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../TasksPage/TasksPage.scss'
import Exel from './components/Exel/Exel';
import PlacingAnOrder from './components/PlacingAnOrder/PlacingAnOrder';
import ProcessorGraph from './components/ProcessorGraph/ProcessorGraph';
import RandomColor from './components/RandomColor/RandomColor';
import TableProducts from './components/TableProducts/TableProducts';
import ViewCounter from './components/ViewCounter/ViewCounter';

const TasksPage = () => {
  return (
    <main className="page">
        <Story />
        <RandomColor />
        <PlacingAnOrder />
        <TableProducts />
        <ProcessorGraph />
        <Exel />
        <ViewCounter />
        {/* <InDevSection sectionName='Tasks'/> */}
    </main>
  )
}

export default TasksPage;