import React from 'react';
import { ReactComponent as Home } from '../images/menu/home.svg';
import { ReactComponent as World } from '../images/menu/world.svg';
import { ReactComponent as Users } from '../images/menu/users.svg';
import { ReactComponent as Ranking } from '../images/menu/ranking.svg';
import { ReactComponent as Buildings } from '../images/menu/buildings.svg';
import { ReactComponent as Calendar } from '../images/menu/calendar.svg';
import { ReactComponent as Settings } from '../images/menu/settings.svg';
import { ReactComponent as Tasks } from '../images/menu/tasks.svg';
import { ReactComponent as Messages } from '../images/menu/messages.svg';
import { ReactComponent as Profile } from '../images/menu/profile.svg';
import { ReactComponent as Menu } from '../images/menu/menu.svg';
import { ReactComponent as Search } from '../images/menu/search.svg';

export const menuItemsLeftPanel = [
    {
        name: "home",
        icon: <Home />,
        link: "/"
    },
    {
        name: "map",
        icon: <World />,
        link: "/map"
    },
    {
        name: "herd",
        icon: <Users />,
        link: "/herd"
    },
    {
        name: "ranking",
        icon: <Ranking />,
        link: "/ranking"
    },
    {
        name: "buildings",
        icon: <Buildings />,
        link: "/buildings"
    },
    {
        name: "calendar",
        icon: <Calendar />,
        link: "/calendar"
    },
    {
        name: "settings",
        icon: <Settings />,
        link: "/settings"
    }
];

export const menuItemsTopPanel = [
    {
        name: "tasks",
        icon: <Tasks />,
        link: "/tasks"
    },
    {
        name: "messages",
        icon: <Messages />,
        link: "/messages"
    },
    {
        name: "profile",
        icon: <Profile />,
        link: "/profile"
    }
];

export const menuItemsLeftUpperCorner = {
    name: "menu",
    icon: <Menu />,
    link: "/"
};

export const searchIcon = {
    name: "search",
    icon: <Search />,
};