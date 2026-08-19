import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { PrimaryButton, SecondaryButton } from '@/components/swimbook/Buttons';
import { ThemeColors } from '@/components/swimbook/Theme';
import { useAuthViewModel } from '@/viewmodels/useAuthViewModel';
import { AquaBookLogo } from '@/components/swimbook/AquaBookLogo';
import { SafeAreaView } from "react-native-safe-area-context";

export function AuthScreen({ mode }: { mode: 'login' | 'register' }) {
  const vm = useAuthViewModel(mode);
  const router = useRouter();
  const isLogin = vm.isLoginMode;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.shell}>
        <AquaBookLogo />
        <View style={styles.intro}><Text style={styles.eyebrow}>{isLogin ? 'WELCOME BACK' : 'START YOUR JOURNEY'}</Text><Text style={styles.title}>{isLogin ? 'Ready for the water?' : 'Make time to swim.'}</Text><Text style={styles.copy}>{isLogin ? 'Sign in to see your next lane and training plan.' : 'Create your AquaBook account in a minute.'}</Text></View>
        <View style={styles.modeSwitch}><Pressable onPress={() => { if (!isLogin) router.replace('/login'); }} style={[styles.mode, isLogin && styles.modeActive]}><Text style={[styles.modeText, isLogin && styles.modeTextActive]}>Log in</Text></Pressable><Pressable onPress={() => { if (isLogin) router.replace('/register'); }} style={[styles.mode, !isLogin && styles.modeActive]}><Text style={[styles.modeText, !isLogin && styles.modeTextActive]}>Create account</Text></Pressable></View>
        <View style={styles.form}>
        {!isLogin ? <TextInput placeholder="Your name" placeholderTextColor="#87A6A0" style={styles.input} value={vm.name} onChangeText={vm.setName} autoCapitalize="words" /> : null}
        <TextInput
          placeholder="Email address"
          placeholderTextColor="#87A6A0"
          style={styles.input}
          value={vm.email}
          onChangeText={vm.setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#87A6A0"
          style={styles.input}
          secureTextEntry
          value={vm.password}
          onChangeText={vm.setPassword}
        />
        {!isLogin ? <View style={styles.levelGroup}><Text style={styles.levelLabel}>Your current level</Text><View style={styles.levels}>{(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => <Pressable key={level} onPress={() => vm.setSwimmingLevel(level)} style={[styles.level, vm.swimmingLevel === level && styles.levelSelected]}><Text style={[styles.levelText, vm.swimmingLevel === level && styles.levelTextSelected]}>{level}</Text></Pressable>)}</View></View> : null}
        {vm.error ? <Text style={styles.error}>{vm.error}</Text> : null}
        <PrimaryButton
          title={isLogin ? 'Login' : 'Create account'}
          onPress={() => { void vm.handleAuthSubmit().then((success) => { if (success) router.replace('/(tabs)/home'); }); }}
          loading={vm.isLoading}
        />
        <View style={styles.divider}><View style={styles.dividerLine} /><Text style={styles.dividerText}>OR</Text><View style={styles.dividerLine} /></View>
        <SecondaryButton title="Continue with Google" onPress={() => { void vm.handleOAuth('Google').then(() => router.replace('/(tabs)/home')); }} />
        <Pressable onPress={() => router.push('/onboarding')}><Text style={styles.link}>← Back to welcome</Text></Pressable>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ThemeColors.poolMist,
  },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  shell: { width: '100%', maxWidth: 520, alignSelf: 'center', gap: 28 },
  intro: { gap: 8 }, eyebrow: { color: ThemeColors.waterTeal, letterSpacing: 1.5, fontSize: 11, fontWeight: '800' },
  title: { color: ThemeColors.deepPool, fontSize: 32, lineHeight: 38, fontWeight: '700' },
  copy: { color: '#547176', fontSize: 15, lineHeight: 22 },
  modeSwitch: { flexDirection: 'row', backgroundColor: '#E3F0EE', padding: 4, borderRadius: 14 }, mode: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 }, modeActive: { backgroundColor: ThemeColors.white }, modeText: { color: ThemeColors.gray, fontWeight: '700', fontSize: 13 }, modeTextActive: { color: ThemeColors.waterTeal }, form: { gap: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#D0E3E0',
    backgroundColor: ThemeColors.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: ThemeColors.deepPool,
  },
  error: { color: ThemeColors.buoyCoral, fontSize: 14 },
  link: { color: ThemeColors.waterTeal, textAlign: 'center', marginTop: 8, fontWeight: '600' },
  levelGroup: { gap: 8 }, levelLabel: { color: ThemeColors.deepPool, fontWeight: '700', fontSize: 13 }, levels: { flexDirection: 'row', gap: 7 }, level: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: ThemeColors.border }, levelSelected: { borderColor: ThemeColors.waterTeal, backgroundColor: '#EAF9F7' }, levelText: { color: ThemeColors.gray, fontWeight: '700', fontSize: 11 }, levelTextSelected: { color: ThemeColors.waterTeal },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10 }, dividerLine: { height: 1, flex: 1, backgroundColor: ThemeColors.border }, dividerText: { fontSize: 11, color: ThemeColors.gray, fontWeight: '700' },
});
