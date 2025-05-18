class Auth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  async signup(name, email, password) {
    // Check if user already exists
    if (this.users.find(user => user.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: await this.hashPassword(password)
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  async login(email, password) {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await this.verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    const { password: _, ...userWithoutPassword } = user;
    this.currentUser = userWithoutPassword;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // In a real application, use proper password hashing
  async hashPassword(password) {
    return password; // Replace with proper hashing in production
  }

  async verifyPassword(password, hashedPassword) {
    return password === hashedPassword; // Replace with proper verification in production
  }
}

export const auth = new Auth(); 