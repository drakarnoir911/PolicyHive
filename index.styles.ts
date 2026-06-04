// app/index.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { PolicyHiveTypography } from '@/constants/design-system';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  blob: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.6,
  },
  blobPrimary: {
    width: 300,
    height: 300,
    backgroundColor: '#3b82f6', 
    top: height * 0.1,
    left: -width * 0.2,
  },
  blobSecondary: {
    width: 250,
    height: 250,
    backgroundColor: '#8b5cf6',
    bottom: height * 0.1,
    right: -width * 0.1,
  },
  glassCard: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', 
  },
  innerCard: {
    padding: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
  },
  header: {
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subHeader: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#0A0A0A',
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  forgotPassword: {
    marginTop: 24,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: PolicyHiveTypography.bodyMedium,
    fontSize: 14,
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 16,
    fontFamily: PolicyHiveTypography.bodyMedium,
  }
});