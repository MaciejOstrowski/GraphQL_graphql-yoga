// Array of users
const users = [
    {
        id: "1",
        name: 'Steven',
        email: 'Kowalsky@email.com',
        age: 21
    },
    {
        id: "2",
        name: 'John',
        email: 'Snow@email.com',
    },
    {
        id: "3",
        name: 'Rick',
        email: 'Grimes@email.com',
        age: 23
    },
    {
        id: "4",
        name: 'Eugene',
        email: 'Kowalsky4@email.com',
    },
    {
        id: "5",
        name: 'Steven',
        email: 'Kowalsky5@email.com',
        age: 25
    },
]

const posts = [
    {
        id: "11",
        title: 'Lord Of The Rings',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 1,
        
    },
    {
        id: "12",
        title: 'Fast and Fury',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: "13",
        title: 'Intouchables',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: "14",
        title: 'Inception',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 4
    },
    {
        id: "15",
        title: 'Predator',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 3
    },
    {
        id: "16",
        title: 'The Alien',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 1
    },
]

const comments = [
    {
        id: 101,
        text: 'Duis ultricies luctus orci, non tincidunt lacus posuere sit amet.',
        author: 1,
        post: 12
    },
    {
        id: 102,
        text: 'Pellentesque at neque urna. Nunc interdum pulvinar odio, ut fermentum.',
        author: 2,
        post: 13
    },
    {
        id: 103,
        text: 'Vestibulum bibendum auctor turpis, ac faucibus metus consectetur non. Vestibulum.',
        author: 3,
        post: 14
    },
    {
        id: 104,
        text: 'Donec imperdiet sagittis purus sit amet luctus. Fusce molestie est.',
        author: 4,
        post: 15
    },

]

const db = {
    users,
    posts,
    comments
}

export { db as default }