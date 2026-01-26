import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import '../ViewCounter/ViewCounter.scss'
import ViewCounterCounter from '../ViewCounterCounter/ViewCounterCounter';

const ViewCounter = () => {
    return(
        <section className='viewCounter'>
            <div className='container'>
                <SectionTitle title='Счетчик хитов'/>
                <div className='taskWrapper'>
                    <ViewCounterCounter />
                </div>
            </div>
        </section>
    )
}

export default ViewCounter;