
import { useState , useContext } from 'react';
import {Box, TextField , Button , styled , Typography} from '@mui/material'
//import { Box } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const signUpInitialValues= {
    name :  '',
    username : '',
    password: ''
}

const loginInitialValues= {
     
    username : '',
    password: ''
}

const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrqrfW-s0GJMP4gb-jXuMNmv_JJ14xO1ceIQD2nGe93Q&s';

    const [account , toggleAccount] = useState('Login')
    const [signup , setSignup] = useState(signUpInitialValues)
    const [login , setLogin] = useState(loginInitialValues)
    const [error, setError] = useState('')

    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();

    const toggle = ()=>{
        account === 'Login' ? toggleAccount('Signup') : toggleAccount('Login');
    }

    const onInputChange  = (e)=>{
         setSignup({...signup, [e.target.name] : e.target.value})
        // console.log(e.target.name , e.target.value)
    }

    const signupUser = async () => {
        
        let response = await API.userSignup(signup);

        if(response.isSuccess){
            setError('');
            setSignup(signUpInitialValues)
            
            toggleAccount('Login')
        }else{
            setError('Something Went Wrong please try again later')
        }
    }


    const onValueChange = (e)=>{
        setLogin({...login  , [e.target.name] : e.target.value})
    }

    const loginUser  = async ()=>{
        let response = await API.userLogin(login);

        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true);
            navigate('/');
        }else{
            setError('Something Went Wrong please try again later')
        }
    }

    return (
        <Component>
            <box>

            <Image src={imageURL} alt="login" />
            {    
                account === 'Login' ?
            <Wrapper>
                 <TextField variant='standard' value = {login.username} onChange={(e)=> onValueChange(e)} name="username"  label='Enter Username'/> 
                 <TextField variant='standard' value = {login.password} onChange={(e)=> onValueChange(e)}  name="password" label='Enter Password'/> 
                 {error && <Error>{error}</Error>}
                 <LoginButton variant='contained' onClick={()=> loginUser()}>Login</LoginButton>
                 <Text style={{ textAlign: 'center' }}> OR </Text>
                 <SignupButton onClick={()=>toggle()}>Create an account</SignupButton>


            </Wrapper>
            :
            <Wrapper>
                 <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='name' label='Enter Name'/> 
                 <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='username' label='Enter Username'/> 
                 <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='password' label='Enter Password'/> 
                 {/* to differentiate between the three we use name keyword */}
                 {error && <Error>{error}</Error>}

                 <SignupButton onClick={()=> signupUser()}>Signup</SignupButton>
                 <Text style={{ textAlign: 'center' }}> OR </Text>
                 <LoginButton variant='contained' onClick={()=>toggle()}>Already have an account</LoginButton>


            </Wrapper>

            }
           
           
            </box>
         

        </Component>
    );
};

export default Login;



/*


// If a Box component in Material-UI is turned into a flex container using display="flex", 
// it will apply the CSS flexbox layout model to that container. This means the Box will manage its children (flex items)
//  using flexbox properties, which provide powerful capabilities for aligning and distributing space among items in the container. 
//  justifyContent: Aligns flex items along the main axis (horizontal by default).
  When you apply display: flex to a container, it becomes a flex container, and its direct children become flex items.

  // Label and placeholder me main difference ye hota h ki placeholder ka text remove ho jata h when we start typing but label ka nhi hota

 */


