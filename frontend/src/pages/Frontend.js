import React, { useEffect, useState } from 'react';
import Chats from '../components/Chats';

const Frontend = () => {
    const [allChats, setAllChats] = useState([]);
    const [filteredchats, setFilteredChats] = useState([]);
    const [filters, setFilters] = useState({
        s: '',
        sort: '',
        page: 1
    });
    const perPage = 9;
    const [lastPage, setLastPage] = useState(0);

        useEffect( () =>{

            (
                async () => {


                    const response = await fetch('http://203.142.76.236:8000/api/chats/frontend', {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                        }
                    });

                    
                    const content = await response.json();

                    
                    setAllChats(content);
                    setFilteredChats(content.slice(0, filters.page * perPage));
                    setLastPage(Math.ceil(content.data.length / perPage));
                }
            )()
        }, []);

        useEffect( () => {
            let chats = allChats.filter(c => c.text.toLowerCase().indexOf(filters.s.toLocaleLowerCase()) >= 0 ||
            c.nomor.toLowerCase().indexOf(filters.s.toLocaleLowerCase()) >= 0 || c.nama.toLowerCase().indexOf(filters.s.toLocaleLowerCase()) >= 0 || c.time.toLowerCase().indexOf(filters.s.toLocaleLowerCase()) >= 0);

            if(filters.sort === 'asc'){
                chats.sort( (a, b) => {
                    return b.time.localeCompare(a.time);
                   //return a.localeCompare
                });
            }
            setLastPage(Math.ceil(chats.length / perPage));
            setFilteredChats(chats.slice(0, filters.page * perPage));
        }, [filters])

    return (
        <Chats chats={filteredchats} filters={filters} setFilters={setFilters} lastPage={lastPage}/>
    );
};

export default Frontend;