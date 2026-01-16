import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../FavoritePage/FavoritePage.scss'

const FavoritePage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='Favorite'/>
    </main>
  )
}

export default FavoritePage;