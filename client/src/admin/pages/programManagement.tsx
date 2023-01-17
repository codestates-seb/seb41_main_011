import CreatePrograms from '../components/CreatePrograms';
import Sidebar from '../components/UI/Sidebar';
import { PageWrapper } from '../components/UI/PageWrapper';
const ProgramManagement = ()=>{
  
  return (
    <PageWrapper>
      <Sidebar/>
      <CreatePrograms />
    </PageWrapper>
    
  )



}

export default ProgramManagement;