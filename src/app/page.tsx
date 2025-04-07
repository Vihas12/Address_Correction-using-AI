import  Dashboard from './(routes)/dashboard/page';

interface Home {}

const Home: React.FC<Home> = () => {

  return (
    <div>
    <Dashboard />
    </div>

  );
};

export default Home;