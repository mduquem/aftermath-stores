import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@aftermathventures.com',
		password: bcrypt.hashSync('aftermath', 10),
		isAdmin: true
	},
	{
		name: 'John Doe',
		email: 'userone@aftermathventures.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'Jane Doe',
		email: 'usertwo@aftermathventures.com',
		password: bcrypt.hashSync('123456', 10)
	}
]
export default users
