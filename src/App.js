import Header from './Header';
import Content from './Content';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Footer from './Footer';
import { useState } from 'react';
// import apiRequest from './apiRequest' !APP IS MODIFIED TO USE LOCALSTORAGE


function App() {

  // const API_URL = 'http://localhost:3500/items'
  const [items,setItems] = useState(JSON.parse(localStorage.getItem('todoList')) || [])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  // const [fetchError,setFetchError] = useState(null)
  // const [isLoading,setIsLoading] = useState(true)

  // useEffect(() => {
    // const fetchItems = async () => {
    //   try{
    //     const response = await fetch(API_URL)
    //     if (!response.ok) throw Error('Did not receive expected data')
    //     const listItems = await response.json()
    //     setItems(listItems)
    //     setFetchError(null)
    //   } catch (err){
    //       setFetchError(err.message)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // setTimeout(() => {
    //   (async () => await fetchItems())()
    // },1000)
    //!AGAIN APP HAS BEEN MODIFIED TO USE LOCAL STORAGE
  // },[])

  const setAndSaveItems = (NewListItems) => {
      setItems(NewListItems)
      localStorage.setItem('todoList',JSON.stringify(NewListItems))
  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length-1].id + 1:1
    const myNewItem = {id,checked:false,item}
    const listItems = [...items, myNewItem]
    setAndSaveItems(listItems)
    
    // const postOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify(myNewItem)
    // }
    // const result = await apiRequest(API_URL,postOptions)
    // if (result) setFetchError(result)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return
    addItem(newItem)
    setNewItem('')
  }
  const handleCheck = async (id) => {
    const listItems = items.map((item) => (item.id === id)? {...item, checked:!item.checked}: item)
    setAndSaveItems(listItems)

    // const myItem = listItems.filter((item) => item.id === id)
    // const updateOptions = {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({ checked:myItem[0].checked})
    // }
    // const reqUrl = `${API_URL}/${id}`
    // const result = await apiRequest(reqUrl,updateOptions)
    // if (result) setFetchError(result)
}
const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setAndSaveItems(listItems)

    // const deleteOptions = {method: 'DELETE'}
    // const reqUrl = `${API_URL}/${id}`
    // const result = await apiRequest(reqUrl,deleteOptions)
    // if (result) setFetchError(result)
  }
  
  return (
    <div className="App">
      <Header title="TODOS"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
        />
            <Content 
            items={items.filter((item) => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
