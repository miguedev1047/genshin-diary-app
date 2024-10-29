import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './shared/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './consts/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
  	container: {
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			'main-primary': '#18181B',
  			'main-secondary': '#27272A',
  			'main-text': '#E5E5E5',
  			'main-muted': '#616060',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
			warning: {
				DEFAULT: 'hsl(var(--warning))',
				foreground: 'hsl(var(--warning-foreground))'
			},
			success: {
				DEFAULT: 'hsl(var(--success))',
				foreground: 'hsl(var(--success-foreground))'
			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'image-glow': {
  				'0%': {
  					opacity: '0',
  					'animation-timing-function': 'cubic-bezier(0.74, 0.25, 0.76, 1)'
  				},
  				'10%': {
  					opacity: '0.7',
  					'animation-timing-function': 'cubic-bezier(0.12, 0.01, 0.08, 0.99)'
  				},
  				'100%': {
  					opacity: '0.4'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'none'
  				}
  			},
  			'fade-up': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'none'
  				}
  			},
  			shimmer: {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shimmer-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shimmer-width)) 0'
  				}
  			},
  			'background-position-spin': {
  				'0%': {
  					backgroundPosition: 'top center'
  				},
  				'100%': {
  					backgroundPosition: 'bottom center'
  				}
  			},
  			shine: {
  				from: {
  					backgroundPosition: '200% 0'
  				},
  				to: {
  					backgroundPosition: '-200% 0'
  				}
  			},
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			},
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			}
  		},
  		animation: {
  			shine: 'shine 8s ease-in-out infinite',
  			'image-glow': 'image-glow 4100ms 600ms ease-out forwards',
  			'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards',
  			'fade-up': 'fade-up 1000ms var(--animation-delay, 0ms) ease forwards',
  			shimmer: 'shimmer 8s infinite',
  			backgroundPositionSpin: 'background-position-spin 3000ms infinite alternate',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'shiny-text': 'shiny-text 8s infinite',
  			rainbow: 'rainbow var(--speed, 2s) infinite linear'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
}
export default config
