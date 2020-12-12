import React ,{useContext, Fragment} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,NavItem,NavLink,NavbarText
} from "reactstrap"
import {Link} from "react-router-dom"

const Header =(props)=>{
    return(
        <Navbar color='info' light expand='md'>
            <NavbarBrand>
                LCGM Technologies Pvt.Ltd
            </NavbarBrand>
            <NavbarText className='text-white'>
                {
                    props.user ? props.user.email : ""
                }
            </NavbarText>
            <NavbarToggler />
            <Collapse navbar>
                <Nav className='ml-auto' navbar>
                    {
                        props.user ? (
                            <NavItem>
                                <NavLink tag={Link} to='/home' className='text-white'>
                                Logout
                            </NavLink>
                            </NavItem>
                        ) : (
                            <Fragment>
                            <NavItem>
                                <NavLink tag={Link} to='/signin' className='text-white'>
                                Signin
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/signup' className='text-white'>
                                Signup
                            </NavLink>
                            </NavItem>
                            </Fragment>
                        )
                    }
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header
