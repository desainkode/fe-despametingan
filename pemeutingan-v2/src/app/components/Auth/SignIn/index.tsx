'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Logo from '@/app/components/Layout/Header/Logo'
import Loader from '@/app/components/Common/Loader'
import { signIn } from 'next-auth/react'

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({
    nik: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    setError("");

    if (!loginData.nik) {
      setError("NIK wajib diisi.");
      isValid = false;
    } else if (loginData.nik.length !== 16 || !/^\d+$/.test(loginData.nik)) {
      setError("NIK harus berupa 16 digit angka.");
      isValid = false;
    } else if (!loginData.password) {
      setError("Password wajib diisi.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        nik: loginData.nik,
        password: loginData.password,
        redirect: false,
      });

      if (res?.error) {
        setError("NIK atau Password salah.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className='mb-10 text-center mx-auto block'>
        <Logo />
        <h2 className="text-2xl font-medium mt-6 text-dark dark:text-white">Login Warga</h2>
        <p className="text-sm text-body-secondary mt-2">Silakan masuk menggunakan NIK Anda</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-500 text-sm font-medium border border-red-100 text-left">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="text-left">
        <div className='mb-[22px]'>
          <label className="block text-sm font-medium text-dark dark:text-white mb-2 ml-1">NIK (16 Digit)</label>
          <input
            type="text"
            placeholder="Masukkan NIK Anda"
            maxLength={16}
            onChange={(e) =>
              setLoginData({ ...loginData, nik: e.target.value })
            }
            className='w-full rounded-xl border placeholder:text-gray-400 border-border dark:border-dark_border bg-transparent px-5 py-3 text-base text-dark outline-hidden transition focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary text-left'
          />
        </div>
        <div className='mb-[22px]'>
          <label className="block text-sm font-medium text-dark dark:text-white mb-2 ml-1">Password</label>
          <input
            type="password"
            placeholder="Masukkan Password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className='w-full rounded-xl border border-border dark:border-dark_border bg-transparent px-5 py-3 text-base text-dark outline-hidden transition focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary text-left'
          />
        </div>
        <div className='mb-6'>
          <button
            type='submit'
            disabled={loading}
            className='flex w-full cursor-pointer items-center justify-center rounded-xl border border-primary bg-primary hover:bg-primary-hover px-5 py-3.5 text-base text-white font-medium transition duration-300 shadow-lg shadow-primary/20 disabled:opacity-70'>
            {loading ? "Memproses..." : "Masuk ke Sistem"}
            {loading && <Loader />}
          </button>
        </div>
      </form>
      <div className='flex flex-col items-center justify-center'>
        <Link
          href='/forgot-password'
          className='text-sm text-dark hover:text-primary dark:text-white dark:hover:text-primary transition-colors font-medium'>
          Lupa Password? Hubungi Admin Desa
        </Link>
      </div>
    </div>
  )
}

export default Signin
