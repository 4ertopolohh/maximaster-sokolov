import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../BasketPage/BasketPage.scss'

const BasketPage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='Basket'/>
    </main>
  )
}

export default BasketPage;