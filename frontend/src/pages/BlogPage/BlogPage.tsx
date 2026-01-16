import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../BlogPage/BlogPage.scss'

const BlogPage = () => {
  return (
    <main className="page">
      <Story />
        <InDevSection sectionName='Blog'/>
    </main>
  )
}

export default BlogPage;