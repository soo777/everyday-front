import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'src/style/style.scss';
import BoardListPage from 'src/pages/BoardListPage';

function App() {
  return (
    <>
      <div className="everyday">
        <BoardListPage />
      </div>
    </>
  );
}

export default App;
