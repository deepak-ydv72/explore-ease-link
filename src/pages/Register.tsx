import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { loginSuccess } from '@/store/slices/authSlice';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: 'At least 8 characters', check: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', check: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', check: /[a-z]/.test(formData.password) },
    { label: 'Contains number', check: /\d/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: 'Error',
        description: 'Please agree to the terms and conditions.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.check);
    if (!allRequirementsMet) {
      toast({
        title: 'Error',
        description: 'Please meet all password requirements.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Simulate registration API call
    setTimeout(() => {
      dispatch(loginSuccess({
        id: '1',
        name: formData.name,
        email: formData.email,
      }));
      
      toast({
        title: 'Welcome to Strangers Travel!',
        description: 'Your account has been created successfully.',
      });

      navigate('/');
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 px-4 py-8">
      <Card className="w-full max-w-md shadow-travel">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              Strangers Travel
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">Join Our Community</CardTitle>
          <CardDescription>
            Create your account and start your adventure today
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="space-y-2 mt-3">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Check 
                        className={`w-4 h-4 ${req.check ? 'text-green-500' : 'text-muted-foreground'}`}
                      />
                      <span className={req.check ? 'text-green-600' : 'text-muted-foreground'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="agree-terms" 
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                  required
                />
                <Label htmlFor="agree-terms" className="text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsletter" 
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, subscribeNewsletter: checked as boolean }))
                  }
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for travel deals and updates
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="ocean"
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground text-sm">
                Already have an account?{' '}
              </span>
              <Link to="/login" className="text-primary hover:underline text-sm font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;